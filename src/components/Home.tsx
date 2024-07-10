// import React from 'react'
import './Home.css'
import { useGetStructureQuery,useAddRootFolderMutation, useAddFileOrFolderFolderMutation ,useDeleteFolderOrFileMutation } from '../slices/StructureSlice'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Structure } from '../models/structure';
import { useEffect, useState } from 'react';

function home() {

  const [structures, setStructures] = useState<Structure[]>([])
  const [addRootFolder , {isLoading: addRootFolderLoading}] = useAddRootFolderMutation();
  const [showRootAddBox, setShowRootAddBox] = useState(false)
  const [rootName, setRootName] = useState('')

  const [showOptions, setShowOptions] = useState(false)
  const [addType, setAddType] = useState('')
  const [showAddBox, setShowAddBox] = useState(false)
  const [elementName, setElementName] = useState('')
  const [currentElementId, setCurrentElementId] = useState('')

  const [addFileOrFolderFolder,  {isLoading: addFileOrFolderFolderLoading}] = useAddFileOrFolderFolderMutation();
  const [deleteFolderOrFile,  {isLoading: deleteFolderOrFileLoading}] = useDeleteFolderOrFileMutation();

  const [showError, setShowError] = useState(false)

  interface QueryState {
      data?: Structure[];
  }

  const { isLoading: getStructureLoading } = useGetStructureQuery();

  const allStructure = useSelector((state:RootState) => {
    const queries = Object.values(state.api.queries) as QueryState[];

    return queries.length > 0 && queries[0].data ? queries[0].data : [];
  });

  // const allStructure = [{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[{"_id":"66619cb52cc341a3175e5b71","value":"root","type":"folder","children":[{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[]},{"_id":"666199542cc341a3175e5b6c","value":"home","type":"folder","children":[]},{"_id":"66619cc42cc341a3175e5b77","value":"top","type":"folder","children":[]}]}]},
  //                       {"_id":"6667e4e8cea8019692bac75c","value":"string","type":"folder","children":[{"_id":"667028c10f5296f8b8c871b4","value":"ss","type":"folder","children":[{"_id":"667028c90f5296f8b8c871e3","value":"dd","type":"file","children":[]},{"_id":"667028d40f5296f8b8c87214","value":"dss","type":"folder","children":[{"_id":"667028e00f5296f8b8c87247","value":"hjj","type":"folder","children":[]}]}]}]},
  //                       {"_id":"667028b30f5296f8b8c8706e","value":"ddd","type":"folder","children":[{"_id":"667028c10f5296f8b8c871b4","value":"ss","type":"folder","children":[{"_id":"667028c90f5296f8b8c871e3","value":"dd","type":"file","children":[]},{"_id":"667028d40f5296f8b8c87214","value":"dss","type":"folder","children":[{"_id":"667028e00f5296f8b8c87247","value":"hjj","type":"folder","children":[]}]}]}]}
  //                     ]
  
  useEffect(()=>{
    setStructures(allStructure)
  },[getStructureLoading])

  function deleteElement(id:string){
    deleteFolderOrFile(id)
    setCurrentElementId('')
    setElementName('')
  }

  function addElement(id:string){
    setElementName('')
    setCurrentElementId(id)
    setShowOptions(true)
    setShowAddBox(false)
  }

  function selectElement(type:string){
    setAddType(type)
    setShowOptions(false)
    setShowAddBox(true)
  }

  function addRight(parent_id:string){
    addFileOrFolderFolder({
      value:elementName,
      type:addType,
      parent:parent_id,
    })
    setShowOptions(false)
    setShowAddBox(false)
    setElementName('')
    setCurrentElementId('')
    setShowError(false)
  }

  function addWrong(){
    // setShowOptions(false)
    setShowAddBox(false)
    setElementName('')
    setCurrentElementId('')
    setShowError(false)
  }

  function handleOnChange(e:React.ChangeEvent<HTMLInputElement>){
    setElementName(e.target.value)
    if(e.target.value){
      setShowError(false)
    }
    else{
      setShowError(true)
    }
  }


  function getFolder(structure:Structure){
    return(
      <>
        <li key={structure._id} className={`${structure.type} tree-lines`}>
          <p className='list-tree'>
            {/* <div> */}
              <img src={structure.type==='folder'?'public/folder.png':'public/file.png'} className='image'></img>
              <span className='fname'>
                {structure.value}
                {structure.type==='folder' && <span className='plus' onClick={()=>addElement(structure._id)}>+</span>}
                {<span className='minus' onClick={() => deleteElement(structure._id)}>-</span>}
              </span>
            {/* </div> */}
          </p>
        </li>
        
          {structure.children.length > 0 && (
            <ul className="folder-strucrure">
              {structure.children.map((structure)=>(
                
                getFolder(structure)
                
              ))}
            </ul>
          )}
        
          <div>
            {showOptions && currentElementId===structure._id &&
            <ul>
              <li key={structure._id} className={`${structure.type} tree-lines`}>
                <p className='list-tree'>
                  <button onClick={() => selectElement("file")}>File</button>
                  <button onClick={() => selectElement("folder")} >Folder</button>
                </p>
              </li>
              </ul>
            }
            {showAddBox && currentElementId===structure._id && 
            <ul>
              <li key={structure._id} className={`${structure.type} tree-lines`}>
                <p className='new-root-node list-tree'>
                  <img src={addType==='folder'?'public/folder.png':'public/file.png'} className='image'></img>
                  <form>
                    <input type='text' name="rootName" value={elementName} onChange={handleOnChange}/>
                    <button disabled={showError} 
                    // onTouchEnd={()=>{
                    //   if(elementName){
                    //     setShowError(false)
                    //   }
                    //   else{
                    //     setShowError(true)
                    //   }
                    // }}
                   className="add-btn" onClick={() => {
                      if(elementName){
                        addRight(structure._id)
                        setShowError(false)
                      }
                      else{
                        setShowError(true)
                      }
                    }}>✔</button>
                    <button className="cancel-btn" onClick={addWrong}>✕</button>
                  </form>
                  {showError && <div className='name-error'>Name is required.</div>}
                </p>
              </li>
              </ul>
            }
          </div>
          
        
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

  function clickAddRootFolder(){
    setShowRootAddBox(true)
  }

  function handleRootOnChange(e: React.ChangeEvent<HTMLInputElement>){
    setRootName(e.target.value)
  }

  function addRootRight(){
    if(rootName){
      setShowRootAddBox(false)
      addRootFolder({value:rootName})
    }
    setRootName('')
  }

  function addRootWrong(){
    setShowRootAddBox(false)
    setRootName('')
  }

  return (
    <div>
        <h1  className="heading">FOLDER STRUCTURE</h1>

        <div>
          <button type='button' className='add-folder' onClick={clickAddRootFolder}>Add folder to root</button>
        </div>

        <div>
          <div>
            {(addRootFolderLoading || deleteFolderOrFileLoading || addFileOrFolderFolderLoading || getStructureLoading) && (<img className="img-loader" src="public\ripples.svg" alt="Loading..." />)}
            {!(addRootFolderLoading || deleteFolderOrFileLoading || addFileOrFolderFolderLoading || getStructureLoading) && 
              <div>
                  {getStructure(allStructure)}
              </div>
            }
          </div>

          {showRootAddBox &&
            <ul>
              <li className={`tree-lines`}>
                <div className='new-root-node'>
                  <img src='public/folder.png' className='image'></img>
                  <form>
                    <input type='text' name="rootName" value={rootName} onChange={handleRootOnChange}/>
                    <button className="add-btn" onClick={() => addRootRight()}>✔</button>
                    <button className="cancel-btn" onClick={addRootWrong}>✕</button>
                  </form>
                </div>
              </li>
            </ul>
          }
        </div>
    </div>
  )
}

export default home