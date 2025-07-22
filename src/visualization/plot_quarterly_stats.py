import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the data
df = pd.read_csv("data/processed/quarterly_stats.csv")

# Create a combined year-quarter column
df["Year-Quarter"] = df["Year"].astype(str) + "-" + df["Quarter"]

# Plot setup
sns.set(style="whitegrid")
plt.figure(figsize=(12, 6))

# Correct column names: use Avg_Value instead of avg
sns.lineplot(
    data=df,
    x="Year-Quarter",
    y="Avg_Value",
    hue="Mode",
    style="Metric",
    marker="o"
)

# Axis and title styling
plt.xticks(rotation=45)
plt.title("Quarterly Average Ridership Values")
plt.xlabel("Quarter")
plt.ylabel("Average Value")
plt.tight_layout()

# Save the plot
plt.savefig("reports/figures/quarterly_avg_trends.png")
