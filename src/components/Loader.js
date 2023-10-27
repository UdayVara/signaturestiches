import React from 'react'
import styles from "../styles/loader.module.css"
function Loader() {
  console.log(styles);
  return (
    <>
    <div className="d-flex justify-content-center">
    <div className={styles.loader} style={{position: 'fixed',top:"40vh"}}></div>
    </div>
    </>
  )
}

export default Loader