import csv
import pandas as pd
import numpy as np
from statsmodels.stats.outliers_influence import variance_inflation_factor
# Prompt the user for the CSV file path
csv_file_path = input("Enter the path to the CSV file: ")

# Read the CSV file into a DataFrame
try:
    df = pd.read_csv(csv_file_path)

    # Display the DataFrame
    # print(df)

except FileNotFoundError:
    print(f"Error: File not found at path '{csv_file_path}'. Please check the path and try again.")
except pd.errors.EmptyDataError:
    print(f"Error: The CSV file at path '{csv_file_path}' is empty.")
except pd.errors.ParserError:
    print(f"Error: Unable to parse the CSV file at path '{csv_file_path}'. Please check the file format.")
except Exception as e:
    print(f"An error occurred: {e}")

rows , columns = df.shape[0] , df.shape[1]-1
def calc_vif(dataset):
    vif = pd.DataFrame()
    vif['features'] = dataset.columns
    vif['VIF_value'] = [variance_inflation_factor(dataset.values , i) for i in range(dataset.shape[1])]
    return(vif)
vif = calc_vif(df.iloc[:,:-1])
low_vif = vif.loc[vif['VIF_value'] > 7]
a = len(list(low_vif.features))
avg_vif = vif['VIF_value'].sum()/len(vif.features)
nan = df.isna().sum().sum()
info = { 'Rows': rows , 'Features':columns , 'correlation rating':avg_vif , 'Nan values':nan  }
def price(df , info):
    if rows < 100 | columns < 2 :
        predicted_price = 0
    else:
        predicted_priseconce = 100*info['Rows']/(info['Features']*info['correlation rating']) - 10*(info['Nan values'])
    return predicted_price
print(price(df,info))