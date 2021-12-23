const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw";

mapkit.init({
    authorizationCallback: function (done) {
        done(tokenID);
    }
});

var map = new mapkit.Map("map");