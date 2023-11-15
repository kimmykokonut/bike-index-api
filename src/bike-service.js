export default class BikeService {
  static getStolenInfo(zip) {
    return fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=25&location=${zip}&distance=10&stolenness=proximity`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}${apiErrorMessage.messag}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}