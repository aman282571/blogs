export function sortByDate(data) {
  data.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
}
export function calcDate(date) {
  let newdate = new Date(date);
  return `${newdate.getFullYear()}/${
    newdate.getMonth() + 1
  }/${newdate.getDate()}`;
}
