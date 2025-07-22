import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data/processed/bus_evasion_df.csv")

sns.set(style="whitegrid")
plt.figure(figsize=(10, 6))
sns.lineplot(data=df, x="Time Period", y="Fare Evasion", hue="Trip Type", marker="o")
plt.xticks(rotation=45)
plt.title("Bus Fare Evasion Over Time")
plt.tight_layout()
plt.savefig("reports/figures/bus_evasion_trend.png")
