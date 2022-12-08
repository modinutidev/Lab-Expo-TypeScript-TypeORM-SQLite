import { FlatList, StatusBar, Text, View } from "react-native";

import "reflect-metadata";
import { connect } from "./dbConnection";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  async function connection() {
    await connect
      .then(async (db) => {
        console.log("Banco conectado!");

        // Adiciona um usuário na tabela
        await db.getRepository("user").save({
          name: "Nome Completo do Usuários",
          idade: 21,
        });

        // Busca todos usuários cadastrados
        setUsers(await db.getRepository("user").find());

        // Monstra usuários no console
        console.log(users);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    connection();
  }, []);

  return (
    <View>
      <StatusBar />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
