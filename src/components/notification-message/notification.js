import { notification } from 'antd';
import { notificationStrings } from '@constants/app-constants';

export const openNotificationWithIcon = (type = notificationStrings.success, title = null, message = null, duration = 4.5) => {
	notification[type]({
		message: title,
		description: message,
		duration: duration,
	});
};
