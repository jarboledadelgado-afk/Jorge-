from orev_p0.main import app
if __name__=='__main__':
    import os,uvicorn
    uvicorn.run('app:app',host='0.0.0.0',port=int(os.getenv('PORT','8000')))
