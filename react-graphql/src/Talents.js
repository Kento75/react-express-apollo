import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Talents = () => (
  <Query
    query={
      /* GraphQLのクエリ */
      gql`
        {
          talents {
            name
            birthday
            age
          }
        }
      `
    }
  >
    {/* GraphQLのクエリの実行結果の処理、成功したら結果を表示 */}
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      return data.talents.map(talent => (
        <div key={talent.name}>
          <p>name: {`${talent.name}`}</p>
          <p>birthday: {`${talent.birthday}`}</p>
          <p>age: {`${talent.age}`}</p>
          <hr />
        </div>
      ));
    }}
  </Query>
);
export default Talents;