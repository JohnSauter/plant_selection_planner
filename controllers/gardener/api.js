/* Paths of the form /gardener/api/...  */
const router = require('express').Router();
const nodemailer = require('nodemailer');

const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* We keep working SMTP information in environment variables.
 * If the information is missing we use ethereal for testing.
 */
let email_host = process.env.EMAIL_HOST;
let email_port = process.env.EMAIL_PORT;
let email_secure = process.env.EMAIL_SECURE;
let email_user = process.env.EMAIL_USER;
let email_password = process.env.EMAIL_PASSWORD;

/* Post to /gardener/api/email sends an email message.  */
router.post('/email', withAuth, async (req, res) => {
  try {
    /* If any of the email information is missing,
     * use the ethereal test site.  */
    let transporter = null;
    if (
      !email_host ||
      !email_port ||
      !email_secure ||
      !email_user ||
      !email_password
    ) {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        host: email_host,
        port: Number(email_port),
        secure: JSON.parse(email_secure),
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: email_user,
          pass: email_password,
        },
      });
    }

    /* The email is from the gardener.  Get her name and
     * email address.  */
    const user_id = req.session.user_id;
    const the_sequelize_user = await User.findByPk(user_id);
    if (!the_sequelize_user) {
      res.status(404).end();
      return;
    }
    const this_user = the_sequelize_user.get({ plain: true });

    const gardener_name = this_user.name;
    const gardener_email = this_user.email;
    const source_list = '"' + gardener_name + '" <' + gardener_email + '>';

    /* The email is to all of the nursery managers.  */
    const sequelize_nursery_managers = await User.findAll({
      where: { user_type: 'Nursery' },
    });

    /* If there are no nursery managers, do not send email.  */
    if (sequelize_nursery_managers.length == 0) {
      res.status(404).end();
      return;
    }

    const nursery_managers = sequelize_nursery_managers.map((element) =>
      element.get({ plain: true })
    );
    let destination_list = '';
    for (let i = 0; i < nursery_managers.length; i++) {
      if (destination_list) {
        destination_list = destination_list + ', ';
      }
      const this_nursery_manager = nursery_managers[i];
      destination_list =
        destination_list +
        '"' +
        this_nursery_manager.name +
        '" <' +
        this_nursery_manager.email +
        '>';
    }

    /* Get the list of plants desired by this gardener.
     * We gather the plants from all the zones, but only
     * mention each plant once in the message to the
     * nursery manager.  */
    const plants_list = {};
    const sequelize_zones = await Garden_zone.findAll({
      where: { user_id: user_id },
    });
    const zones = sequelize_zones.map((element) =>
      element.get({ plain: true })
    );
    for (let i = 0; i < zones.length; i++) {
      const sequelize_plant_instances = await Plant_instance.findAll({
        where: { garden_zone_id: zones[i].id },
      });
      const plant_instances = sequelize_plant_instances.map((element) =>
        element.get({ plain: true })
      );

      for (let i = 0; i < plant_instances.length; i++) {
        const the_plant_instance = plant_instances[i];
        const the_plant_id = the_plant_instance.plant_type_id;
        const the_sequelize_plant_type = await Plant_type.findByPk(
          the_plant_id
        );
        const the_plant_type = the_sequelize_plant_type.get({ plain: true });
        const plant_name = the_plant_type.plant_name;
        plants_list[plant_name] = true;
      }
    }

    let plants_text = '';
    for (the_plant_name in plants_list) {
      if (plants_text) {
        plants_text = plants_text + ', ';
      }
      plants_text = plants_text + the_plant_name;
    }

    /* Construct the message.  */
    const plants_plain_text =
      'I need the following plants for my garden: ' + plants_text + '.';
    const plants_HTML_text =
      '<html><body><p>' +
      'I need the following plants for my garden: ' +
      plants_text +
      '.</p></body></html>';

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: source_list,
      to: destination_list,
      subject: 'My Garden Needs',
      text: plants_plain_text,
      html: plants_HTML_text,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
