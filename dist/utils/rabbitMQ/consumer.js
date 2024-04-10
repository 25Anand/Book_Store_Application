"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumePurchaseNotifications = void 0;
const amqp = require("amqplib");
const user_schema_1 = require("../../users/schema/user.schema");
async function consumePurchaseNotifications() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'purchase_notifications';
        await channel.assertQueue(queue, { durable: false });
        channel.consume(queue, async (message) => {
            const purchaseData = JSON.parse(message.content.toString());
            console.log(`Received purchase notification: ${JSON.stringify(purchaseData)}`);
            const userData = await user_schema_1.UserModel.findById(purchaseData.userId);
            if (userData && userData.email) {
                const email = userData.email;
                await sendPurchaseEmail(email, purchaseData);
            }
            else {
                console.error('User data not found or email not available.');
            }
        }, { noAck: true });
    }
    catch (error) {
        console.error('Error consuming purchase notifications:', error);
    }
    async function sendPurchaseEmail(email, purchaseData) {
        const mailOptions = {
            from: "bharatanand722@gmail.com",
            to: email,
            subject: "Congratulations on Your New Book Purchase!",
            html: { path: "../templates/bookPurchase.html" },
        };
        await this.transporter.sendMail(mailOptions);
    }
}
exports.consumePurchaseNotifications = consumePurchaseNotifications;
//# sourceMappingURL=consumer.js.map