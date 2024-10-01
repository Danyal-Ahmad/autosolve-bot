from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
import os
from autosolve_ai import AutoSolveAI  # Ensure this file contains the AutoSolveAI class

app = FastAPI()

# Request model for incoming problems
class Problem(BaseModel):
    description: str  # Description of the problem to be solved
    data: list  # Additional data related to the problem

# Response model for the solution
class Solution(BaseModel):
    solution: str  # The AI-generated solution to the problem
    confidence: float  # Confidence level of the solution

# Instantiate the AI problem-solving engine
auto_solve_ai = AutoSolveAI()

# API endpoint for solving problems
@app.post("/solve", response_model=Solution)
async def solve_problem(problem: Problem):
    try:
        # Use AI to solve the problem and return the solution
        return auto_solve_ai.solve(problem)
    except Exception as e:
        # Handle errors by returning an HTTP 400 error with the message
        raise HTTPException(status_code=400, detail=str(e))

# Define a root endpoint for testing the server
@app.get("/")
def read_root():
    return {"message": "Welcome to AutoSolve AI!"}

# Favicon endpoint
@app.get("/favicon.ico")
async def favicon():
    # Ensure the favicon.ico file is located in the static directory
    if os.path.exists("static/favicon.ico"):
        return FileResponse("static/favicon.ico")
    else:
        raise HTTPException(status_code=404, detail="Favicon not found")
