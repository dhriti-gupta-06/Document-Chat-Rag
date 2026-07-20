import sqlite3

DATABASE_NAME = "document_chat.db"


def get_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():

    conn = get_connection()
    cursor = conn.cursor()

    # -------------------------------
    # Documents Table
    # -------------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Documents(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            filepath TEXT NOT NULL,
            pages INTEGER,
            chunks INTEGER,
            uploaded_at TEXT
        )
    """)

    # -------------------------------
    # Chat History Table
    # -------------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ChatHistory(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            document_id INTEGER,
            question TEXT,
            answer TEXT,
            created_at TEXT,

            FOREIGN KEY(document_id)
            REFERENCES Documents(id)
        )
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":

    initialize_database()

    print("Database created successfully.")