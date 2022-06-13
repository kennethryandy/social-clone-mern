const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Notification = require('../model/notification');
const router = Router();

// Get all notifications
router.get('/all', isAuth, async (req, res, next) => {
	try {
		const select = ['_id', 'fullname', 'email', 'img'];
		const notifications = await Notification.find({ recipient: req.user.id }).populate({ path: 'sender', select });
		res.json({
			success: 1,
			notifications
		});
	} catch (err) {
		next(err);
	}
});


// Read notifications
router.put('/read', isAuth, async (req, res, next) => {
	try {
		console.log(req.body.ids);
		await Notification.updateMany({ _id: { $in: req.body.ids } }, { $set: { read: true } });;
		res.json({
			success: 1,
			notification_ids: req.body.ids
		});
	} catch (err) {
		next(err);
	}
});


// Delete notification
router.delete('/:notifId', async (req, res, next) => {
	try {
		await Notification.findByIdAndDelete(req.params.notifId);
		res.json({
			success: 1,
			notification_id: req.params.notifId
		});
	} catch (err) {
		next(err);
	}
});


module.exports = router;