# Faz conexão com o banco de dados
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",     # usuário
        password="",     # senha
        database="viagens_db"
    )

# Cria o banco de dados caso ele ainda não exista
def criar_banco_se_nao_existir():
    conexao = mysql.connector.connect(
        host="localhost",
        user="root",     # usuário
        password=""      # senha
    )
    cursor = conexao.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS viagens_db")
    conexao.close()

# Cria a tabela de viagens se ainda não existir
def criar_tabela():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS viagens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            destino VARCHAR(100),
            data VARCHAR(20),
            status VARCHAR(20)
        )
    """)
    conn.commit()
    conn.close()

# Insere uma nova viagem no banco de dados
def inserir_viagem(viagem):
    conn = conectar()
    cursor = conn.cursor()
    sql = "INSERT INTO viagens (destino, data, status) VALUES (%s, %s, %s)"
    val = (viagem.destino, viagem.data, viagem.get_status())  # Usa o getter
    cursor.execute(sql, val)
    conn.commit()
    conn.close()

# Lista todas as viagens cadastradas no banco
def listar_viagens():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM viagens")
    resultados = cursor.fetchall()
    conn.close()

    # Exibe as viagens
    if not resultados:
        print("\n📭 Nenhuma viagem cadastrada.")
    else:
        print("\n📋 Viagens cadastradas:")
        for v in resultados:
            print(f"ID: {v[0]} | Destino: {v[1]} | Data: {v[2]} | Status: {v[3]}")

# Exclui uma viagem com base no ID fornecido
def excluir_viagem_por_id(id_viagem):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM viagens WHERE id = %s", (id_viagem,))
    conn.commit()
    conn.close()
    print(f"🗑️ Viagem com ID {id_viagem} foi excluída.")