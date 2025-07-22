import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv("data/processed/subway_evasion_df.csv")

# Sort by Year and Quarter for chronological order
df['Time Period'] = pd.Categorical(df['Time Period'], categories=df['Time Period'].unique(), ordered=True)
df = df.sort_values("Time Period")

# Plot
plt.figure(figsize=(12, 6))
plt.errorbar(df["Time Period"], df["Fare Evasion"], yerr=df["Margin of Error"],
             fmt='-o', capsize=4, ecolor='gray', color='dodgerblue', label='Fare Evasion')

# Styling
plt.xticks(rotation=45)
plt.xlabel("Time Period (Quarterly)")
plt.ylabel("Subway Fare Evasion Rate")
plt.title("NYC Subway Fare Evasion Over Time (with Margin of Error)")
plt.grid(True, linestyle='--', alpha=0.5)
plt.tight_layout()
plt.legend()
plt.savefig("reports/figures/subway_evasion_trend.png")