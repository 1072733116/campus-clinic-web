/**
 *
 * @author:ChenDW
 * @date:2023-01-30 14:43
 */
const getTimeState = () => {
  const nowTime = new Date();
  const hours = nowTime.getHours();
  if (hours >= 6 && hours <= 11) return `早上好 ⛅`;
  if (hours >= 11 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 17) return `下午好 🌞`;
  if (hours >= 17 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
};

export default getTimeState;
