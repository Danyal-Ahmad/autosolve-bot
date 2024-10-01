import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load your dataset (example: Iris dataset)
data = load_iris()
X, y = data.data, data.target

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the classifier
classifier = RandomForestClassifier()

# Train the model
classifier.fit(X_train, y_train)

# Save the trained model
joblib.dump(classifier, 'problem_classifier.joblib')
