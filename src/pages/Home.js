import React, { useState, useEffect } from 'react'
import './Home.css'
import TopNav from '../components/TopNav'
import DynamicTable from '../components/DynamicTable'

function Home() {
    const [allData, setAllData] = useState([]);
    const [toggleSideNav, setToggleSideNav] = useState(true);
    const [navLink, setNavLink] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [head, setHead] = useState('*');
    const [tableName, setTableName] = useState('');

    const [selectInputAlert, setSelectInputAlert] = useState(false)
    const [tableInputAlert, setTableInputAlert] = useState(false)

    useEffect(() => {
        fetch('data.json')
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText)
            }else{
                return response.json()
            }
        })
        .then(data => {
            setAllData(data)
            let nav_array = []
            for(let i = 0; i < data.length; i++){
                let obj = data[i]
                let key = Object.keys(obj)
                nav_array.push(key[0])
            }
            setNavLink(nav_array)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const filterMainData = (str) => {
        let selected = allData.filter(item => {
            let key = Object.keys(item)
            if(key[0] === str){
                return item
            }
        })
        return selected
    }

    const sideNavTable = (e) => {
        let name = e.target.text;
        let index = filterMainData(name)
        let val_arr = Object.values(index[0])
        setTableData(val_arr[0])
        setTableName(name)
        setHead('*')
    }

    const runQuery = () => {
        if(head.trim() === ''){
            setSelectInputAlert(true)
            return false
        }else{
            setSelectInputAlert(false)
        }
        
        if(tableName.trim() === ''){
            setTableInputAlert(true)
            return false
        }else{
            setTableInputAlert(false)
        }
        
        let data = filterMainData(tableName)
        if(head === '*'){
            if(data.length === 0){
                setTableData([])
            }else{
                let val_arr = Object.values(data[0])
                setTableData(val_arr[0])
            }
        }else{
            if(data.length === 0){
                setTableData([])
            }else{
                let val_arr = Object.values(data[0])
                let arr = []
                for(let i = 0; i < val_arr[0].length; i++){
                    let item = val_arr[0][i]
                    if(item[head] !== undefined){
                        let obj = {}
                        obj[head] = item[head]
                        arr.push(obj)
                    }
                }
                setTableData(arr)
            }
        }
        
        
    }


    return (
        <>
        <TopNav />
        <div className='main_wrapper'>
            <div className="sidebar" style={{width: toggleSideNav ? '220px' : '0px'}}>
                <label className='sidenav_heading'><i className="fa fa-folder-open" aria-hidden="true"></i> TABLES</label>
                <div onClick={sideNavTable}>
                    {
                        navLink && (
                            navLink.map((item, index) => (
                                <a key={index}><i className=" table_icon fa fa-table" aria-hidden="true"></i>{item}</a>
                            ))
                        )
                    }
                </div>
                
            </div>

            <div className="content" style={{marginLeft: toggleSideNav ? '220px' : '0px'}}>
                <div className='main_upper_row'>
                    <div className='toggle_box'>
                        <i onClick={() => setToggleSideNav(!toggleSideNav)} className={toggleSideNav ? "fa fa-arrow-left" : "fa fa-arrow-right"} aria-hidden="true"></i>
                    </div>
                </div>
                <div className='query_input'>
                    <div style={{marginBottom: '30px', marginTop: '10px'}}>
                        <label className='command'>SELECT</label>
                        <label className='input_box'><input value={head} onChange={(e) => setHead(e.target.value)} type="text" /> <label style={{color: 'red'}}>{selectInputAlert && '**Required'}</label></label>
                        <label className='command'>FROM</label>
                        <label className='input_box'><input onChange={(e) => setTableName(e.target.value)} value={tableName} type="text" /> <label style={{color: 'red'}}>{tableInputAlert && '**Required'}</label> </label>
                    </div>
                    <div>
                        <button onClick={runQuery} className='run_query_btn'><i className="fa fa-play" aria-hidden="true"></i>Run Query</button>
                    </div>
                </div>
                <div className='result_table'>
                    <div className='inner_table'>
                        {
                            tableData.length === 0 ? 
                            (
                                <img className='no_data_image' src="images/no_data.png" alt="no data" />
                            )
                            :
                            (
                                <DynamicTable data={tableData} />
                            )
                        }
                    </div>
                    
               
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Home
