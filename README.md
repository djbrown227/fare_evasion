# Data Science Project Template with GitHub Pages (Jekyll Compatible)

This template helps you organize and publish data science projects using GitHub Pages. It supports clean coding practices, reproducibility, and storytelling with Jupyter notebooks, HTML reports, and interactive dashboards.

You can:

* Develop and document your analysis in modular steps (fetching, cleaning, modeling, visualization).
* Organize raw and processed data for reuse and clarity.
* Automatically build and serve your project as a static website using GitHub Pages and Jekyll.
* Share results via summaries, charts, dashboards, and blog-style posts.

---

## ✅ Key Features

* **Jupyter notebooks** for reproducible analysis workflows.
* **Python modules** for reusable, maintainable code (`src/`).
* **Data folders** for raw, interim, and final datasets.
* **Dashboards and visuals** saved as HTML or images for easy sharing.
* **Blog-ready structure** using Jekyll (`index.md`, `_config.yml`, etc).
* **Environment files** for consistent Python environments.
* **Deployable site** using GitHub Pages (Markdown or HTML homepage).

---

## 📁 Project Layout Explained

This template includes folders and files with specific purposes to keep your work clean, reproducible, and publishable:

* **`README.md`**: Project overview and setup instructions (you’re reading it now).

* **`index.md`**: The homepage for your GitHub Pages site, written in Markdown (optional: use `index.html` instead).

* **`_config.yml`**: Configuration for Jekyll, including site title, theme, and markdown processing.

* **`_posts/` and `_layouts/`**: Optional Jekyll directories if you want to write blog posts or customize layouts.

* **`assets/`**: Static files like CSS, JavaScript, and images used in your site or dashboards.

* **`environment.yml` / `requirements.txt`**: Define your Python environment for reproducibility with `conda` or `pip`.

* **`data/`**: Structured storage for your datasets:

  * `raw/`: Unmodified original data.
  * `interim/`: Cleaned but not yet finalized data.
  * `processed/`: Final datasets used in modeling and visualization.
  * `external/`: Third-party or reference data.

* **`database/`**: Optional directory for lightweight SQL databases or config files for database connections.

* **`notebooks/`**: Jupyter notebooks that walk through your project stages:

  * Data collection, cleaning, exploration, modeling, and visualization.

* **`src/`**: Modular Python code organized by function:

  * `data_fetch/`: Scripts for scraping, API calls, or data download.
  * `data_cleaning/`: Data wrangling, QA, and transformations.
  * `feature_engineering/`: Logic to create model-ready features.
  * `modeling/`: Training and evaluating models.
  * `visualization/`: Code to generate charts and plots.
  * `dashboard/`: Code for interactive dashboards (e.g., Streamlit or Plotly Dash).
  * `utils/`: Shared helper functions, config, or logging.

* **`reports/`**: Final outputs and visual content:

  * `figures/`: Static images for notebooks or reports.
  * `dashboards/`: Exported HTML dashboards.
  * `summary.md`: Final write-up or story—can be referenced by your homepage.

* **`Makefile`**: (Optional) Automates common tasks like cleaning data, running models, or starting a dashboard.

---

## 🚀 Getting Started

1. **Clone this repo**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Set up your Python environment**
   With conda:

   ```bash
   conda env create -f environment.yml
   conda activate your-env-name
   ```

   Or with pip:

   ```bash
   pip install -r requirements.txt
   ```

3. **Start working**

   * Add notebooks to `notebooks/`
   * Write modular code in `src/`
   * Save charts to `reports/figures/`
   * Add summary to `reports/summary.md`
   * Edit `index.md` to showcase your work

4. **Publish with GitHub Pages**

   * Push your repo to GitHub.
   * In repo settings, enable GitHub Pages and set the source to `main` or `docs/` as needed.
   * Your site will appear at `https://your-username.github.io/your-repo-name/`.

---

## 📌 Tips

* You can use either `index.md` or `index.html` as your site’s homepage.
* You don’t need to use Jekyll posts or layouts unless you want a blog-style project.
* Customize `_config.yml` to change your site title, theme, or GitHub Pages settings.
* Keep your notebooks clean and reproducible using [nbdev](https://nbdev.fast.ai/) or [Jupytext](https://jupytext.readthedocs.io/en/latest/), if desired.

---

## 🧠 Inspiration

This structure is inspired by best practices from:

* [Cookiecutter Data Science](https://drivendata.github.io/cookiecutter-data-science/)
* [The Turing Way](https://the-turing-way.netlify.app/)
* [GitHub Pages + Jekyll docs](https://docs.github.com/en/pages)

---