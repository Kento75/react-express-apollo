const express = require("express");

const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');

// モックデータ
// 芸能人(好きな)のデータ
const talents = [
  {
    name: "新垣結衣",
    birthday: "1988年6月11日",
    age: 30
  },
  {
    name: "シシド・カフカ",
    birthday: "1985年6月23日",
    age: 33
  }
];

// GraphQLのスキーマ情報
const typeDefs = gql`
  type Query { talents: [Talent] }
  type Talent { name: String, birthday: String, age: Int }
`;

// resolver(データ処理)の設定
// DBからデータを取得したり、APIを呼び出したりする処理もここで記述
const resolvers = {
  Query: { talents: () => talents }
};

// Cross-origin resource sharing (CORS) の設定
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};


// Expressの初期化
const app = express();
app.use(cors(corsOptions));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// サーバの起動
app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});

module.exports = app;