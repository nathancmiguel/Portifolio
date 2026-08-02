interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function transformData(data: Array<Activity>): Array<Activity> {
    return data.map((item) => {
        return {
            date: item.date,
            count: item.count,
            level: item.level,
        };
    });
}

export function selectLastHalfYear(contributions: Array<Activity>): Array<Activity> {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 12;

  return contributions.filter(activity => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};