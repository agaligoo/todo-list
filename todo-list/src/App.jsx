import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import List from './component/List';
import Alert from './component/Alert';

function App() {
  const [name,setName] = useState('')
  const [list,setList] = useState([])
  
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  const [checkeditItem,setCheckedEditItem] = useState(false)
  const [editid,setEditId] = useState(null)

  const submitData =(e)=>{
    e.preventDefault()
    if(!name){
      //แสดง Alert 
      setAlert({show:true,msg:'กรุณาป้อนข้อมูลด้วยครับ',type:'error'})
    }else if(checkeditItem && name){
      //กระบวนการแก้ไขข้อมูล
      const result = list.map((item)=>{
        if(item.id === editid){
          return{...item,title:name}
        }
        return item
      })
      setList(result)
      setName('')
      setCheckedEditItem(false)
      setEditId(null)
      setAlert({show:true,msg:'แก้ไขข้อมูลเรียบร้อย',type:'succes'})
    }
    else{
      const newItem = {
        id:uuidv4(),
        title : name
      }
      setList([...list,newItem])
      setName('')
      setAlert({show:true,msg:'บันทึกข้อมูลเรียบร้อย',type:'succes'})
    }
  }

  const removeItem=(id)=>{
    const result = list.filter((item)=>item.id !== id)
    setList(result)
    setAlert({show:true,msg:'ลบข้อมูลเรียบร้อย!',type:'succes'})
  }

  const editItem=(id)=>{
    setCheckedEditItem(true)
    setEditId(id)
    const serchItem = list.find((item)=>item.id === id)
    setName(serchItem.title)
  }
  return (
    <section className='container'>
      <h1>TodoList App</h1>
      {alert.show &&<Alert {...alert} setAlert={setAlert} list={setList}/>}
      <form action="" className='form-group' onSubmit={submitData}>
       <div className="form-control">
        {/* <legend>List</legend> */}
         <input type="text" className='text-input' 
           onChange={(e)=>setName(e.target.value)} 
           value={name} 
         />
         <button type='submit' className='submit-btn'>
          {checkeditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          </button>
       </div>
      </form>
      <section className='list-container'>
         {list.map((data,index)=>{
          return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
         })}
      </section>
    </section>
  );
}

export default App;
