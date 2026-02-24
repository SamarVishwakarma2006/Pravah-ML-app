import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import root_mean_squared_error, mean_absolute_error, r2_score
import os

def train_model():
    print("Loading data...")
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, "../../navi_mumbai_real_estate_uncleaned_2500 (1)_cleaned.csv")
    
    if not os.path.exists(data_path):
        print(f"Error: dataset not found at {data_path}")
        return
        
    df = pd.read_csv(data_path)
    
    # We drop any NaNs just in case
    df = df.dropna()
    
    print("Label encoding location...")
    # To keep it simple and robust, use target encoding or one-hot.
    # Given the requirements, let's use Target Encoding or Pandas Dummies. Wait, to deploy, we need to save the encoders.
    # Or we can do OneHotEncoder from sklearn.
    from sklearn.compose import ColumnTransformer
    from sklearn.preprocessing import OneHotEncoder, StandardScaler
    from sklearn.pipeline import Pipeline
    
    X = df.drop(columns=['actual_price'])
    y = df['actual_price']
    
    categorical_features = ['location']
    numeric_features = [col for col in X.columns if col not in categorical_features]
    
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    print("Defining Pipeline with GradientBoostingRegressor...")
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(random_state=42))
    ])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training model...")
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    rmse = root_mean_squared_error(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Evaluation Results:")
    print(f"RMSE: {rmse}")
    print(f"MAE: {mae}")
    print(f"R²: {r2}")
    
    # Save the pipeline
    model_path = os.path.join(script_dir, "model.joblib")
    joblib.dump(model, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == "__main__":
    train_model()
