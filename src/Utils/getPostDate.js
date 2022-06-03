export const getPostDate = (createdAt) => {
    const d1 = new Date(createdAt);
    const d2 = new Date();
    let dayDiff = Math.trunc((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    let yearDiff = 0;
    if (dayDiff <= 0) {
        return d1.getHours() + ":" + d1.getMinutes()
    }
    while (dayDiff > 365) {
        yearDiff = 1 + yearDiff
        dayDiff = dayDiff - 365
    }
    if (yearDiff === 0) {
        return `${dayDiff} days ago`
    } else if (dayDiff === 0 || dayDiff === 1) {
        return `${yearDiff} yr ago`
    } else if (dayDiff > 1) {
        return `${yearDiff} yr ${dayDiff} days ago`
    }
}