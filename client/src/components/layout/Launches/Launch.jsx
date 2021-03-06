import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const LAUNCH_QUERY = gql`
  query($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);

  return (
    <div className="container">
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading ...</h4>;
          if (error) console.error(error);

          const {
            flight_number,
            mission_name,
            launch_year,
            launch_success,
            launch_date_local,
            rocket: { rocket_id, rocket_name, rocket_type },
          } = data.launch;

          return (
            <div>
              <h1 className={`display-4 mb-3`}>Mission: {mission_name}</h1>
              <h4 className="mb-3">Launch Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">
                  Launch Date: {launch_date_local}
                </li>
                <li className="list-group-item">
                  Launch Success:
                  <span
                    className={launch_success ? 'text-success' : 'text-danger'}
                  >
                    {' '}
                    {launch_success ? 'Yes' : 'No'}
                  </span>
                </li>
              </ul>
              <br />

              <h4 className="mb-3">Rocket Details</h4>
              <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket_id}</li>
                <li className="list-group-item">Rocket Name: {rocket_name}</li>
                <li className="list-group-item">Rocket Type: {rocket_type}</li>
              </ul>
              <br />

              <Link to="/" className={`btn btn-secondary`}>
                Back
              </Link>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Launch;
