import sqlite3
import pandas as pd
from pathlib import Path

# Path setup
db_path = Path("database/fare_evasion.db")
processed_path = Path("data/processed")

# Create connection
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Load CSVs and write to tables
datasets = {
    "bus_fare_evasion": "bus_evasion_df.csv",
    "subway_fare_evasion": "subway_evasion_df.csv",
    "daily_ridership": "ridership_long.csv",
    "quarterly_stats": "quarterly_stats.csv"
}

for table_name, filename in datasets.items():
    df = pd.read_csv(processed_path / filename)
    df.to_sql(table_name, conn, if_exists="replace", index=False)

conn.close()
print("✅ SQLite database created and tables loaded.")
