from pydantic import BaseModel, EmailStr, Field
class AuthIn(BaseModel): email:EmailStr; password:str=Field(min_length=10); name:str=''
class CaptureIn(BaseModel): text:str=Field(min_length=1,max_length=20000)
class MapIn(BaseModel):
    situation:str=Field(min_length=1,max_length=20000); facts:list[str]=[]; story:str=''; emotion:str=''; need:str=''; missing:list[str]=[]; observed:list[str]=[]; hypothesis:str=''; confidence:str='LOW'; evidence_for:list[str]=[]; evidence_against:list[str]=[]; unknown:list[str]=[]; test_method:str=''
class ValidateIn(BaseModel): response:str; correction:str=''
class ActionIn(BaseModel): description:str=Field(min_length=1); done_definition:str=Field(min_length=1)
class ResultIn(BaseModel): outcome:str=Field(min_length=1); learning:str=Field(min_length=1); user_rating:int|None=Field(default=None,ge=1,le=5)
class MemoryPatch(BaseModel): content:str=Field(min_length=1); status:str='ACTIVE'
class ClosureIn(BaseModel): date:str; closed:str=''; open:str=''; reason_open:str=''; mental_load:int|None=Field(default=None,ge=0,le=10); energy:int|None=Field(default=None,ge=0,le=10); frustration:int|None=Field(default=None,ge=0,le=10); win:str=''
class AnalyzeIn(BaseModel): situation:str; facts:list[str]=[]; story:str=''; emotion:str=''; need:str=''; missing:list[str]=[]
