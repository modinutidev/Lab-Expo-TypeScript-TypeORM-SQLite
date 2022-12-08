import {
  FlatList,
  StatusBar,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import "reflect-metadata";
import { initialize as dbSQLite } from "./SQLiteConnect";
import { useEffect, useState, ChangeEvent } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");

  useEffect(() => {
    // connectionTest();
  }, []);

  // async function connectionTest() {
  //   // Conectar banco de dados local
  //   const db = await dbSQLite;

  //   // Insere registro
  //   await db
  //     .getRepository("usuarios")
  //     .save({ nome: "Nome Completo do Usuário", idade: 20 });

  //   // Busca e armazena informações do banco em uma useState
  //   setUsers(await db.getRepository("usuarios").find());
  // }

  async function insertUser() {
    const db = await dbSQLite;
    await db.getRepository("usuarios").save({ idade: 0, nome: nome });
  }

  async function selectUsers() {
    const db = await dbSQLite;
    setUsers(await db.getRepository("usuarios").find());
  }

  async function actionButton() {
    await insertUser();
    await selectUsers();
    setNome("");
  }

  return (
    <View>
      <StatusBar />

      {/* INPUT */}
      <View style={{ padding: 10 }}>
        <TextInput
          value={nome}
          style={styles.input}
          placeholder="Digite um nome..."
          onChangeText={(value) => setNome(value)}
        />
        <TouchableOpacity style={styles.button} onPress={actionButton}>
          <Text style={styles.textButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* OUTPUT */}
      <FlatList
        style={{ paddingHorizontal: 10, paddingBottom: 10 }}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { height: 40, backgroundColor: "#ddd", paddingHorizontal: 10 },
  button: {
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: { color: "white", fontWeight: "bold" },
});
