import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data/processed/ridership_long.csv")

df["Year-Quarter"] = df["Year"].astype(str) + "-" + df["Quarter"]
sns.set(style="whitegrid")
plt.figure(figsize=(12, 6))
sns.lineplot(data=df, x="Year-Quarter", y="Value", hue="Mode", style="Metric", marker="o")
plt.xticks(rotation=45)
plt.title("Transit Ridership by Mode and Metric")
plt.tight_layout()
plt.savefig("reports/figures/ridership_trends.png")
