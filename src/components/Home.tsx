// import React from 'react'
import './Home.css'
import { useGetStructureQuery } from '../slices/StructureSlice'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Structure } from '../models/structure';
import { useEffect, useState } from 'react';

function home() {

  const [structures, setStructures] = useState<Structure[]>([])

  interface QueryState {
      data?: Structure[];
  }

  const { isLoading: getStructureLoading } = useGetStructureQuery();

  // const allStructure = useSelector((state:RootState) => {
  //   const queries = Object.values(state.api.queries) as QueryState[];

  //   return queries.length > 0 && queries[0].data ? queries[0].data : [];
  // });

  const allStructure = [{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[{"_id":"66619cb52cc341a3175e5b71","value":"root","type":"folder","children":[{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[]},{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[]},{"_id":"66619cc42cc341a3175e5b77","value":"top","type":"folder","children":[]}]}]},
                        {"_id":"6667e4e8cea8019692bac75c","value":"string","type":"folder","children":[{"_id":"667028c10f5296f8b8c871b4","value":"ss","type":"folder","children":[{"_id":"667028c90f5296f8b8c871e3","value":"dd","type":"file","children":[]},{"_id":"667028d40f5296f8b8c87214","value":"dss","type":"folder","children":[{"_id":"667028e00f5296f8b8c87247","value":"hjj","type":"folder","children":[]}]}]}]},
                        {"_id":"667028b30f5296f8b8c8706e","value":"ddd","type":"folder","children":[{"_id":"667028c10f5296f8b8c871b4","value":"ss","type":"folder","children":[{"_id":"667028c90f5296f8b8c871e3","value":"dd","type":"file","children":[]},{"_id":"667028d40f5296f8b8c87214","value":"dss","type":"folder","children":[{"_id":"667028e00f5296f8b8c87247","value":"hjj","type":"folder","children":[]}]}]}]}
                      ]
  
  useEffect(()=>{
    setStructures(allStructure)
    console.log('====>',structures)
  },[getStructureLoading])

  function getFolder(structure:Structure){
    return(
      <>
        <li key={structure._id} className={`${structure.type} tree-lines `}>
          <p className='list-tree'>
            <img src={structure.type==='folder'?'public/folder.png':'public/file.png'} className='image'></img>
            <span className='fname'>
              {structure.value}
              {structure.type==='folder' && <span className='plus'>+</span>}
              {<span className='minus'>-</span>}
            </span>
          </p>
          {structure.children.length > 0 && (
            <div className="folder-strucrure">
              {structure.children.map((structure)=>(
                getFolder(structure)
              ))}
            </div>
          )}
        </li>
      </>
    )
  }

  function getStructure(structures:Structure[]){
    return (<>
      {structures.map((structure)=>(
        <ul className='folder-strucrure'>
          {getFolder(structure)}
        </ul>
        )
      )}
    </>)
    
  }

  useEffect(()=>{
    setStructures(allStructure)
    console.log("===>",structures)
  },[getStructureLoading])

  return (
    <div>
        <h1  className="heading">FOLDER STRUCTURE</h1>

        <button type='button' className='add-folder'>Add folder to root</button>
        <div>
          {/* <ul className='folder-strucrure'> */}
            {getStructure(allStructure)}
          {/* </ul> */}
        </div>
    </div>
  )
}

export default home