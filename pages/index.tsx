import type { NextPage } from 'next'
import { useState } from 'react'

/* Styles */
import styles from '../styles/index.module.css';
import triangleStyles from '../styles/triangle.module.css';

interface ITriangle {
  a: number;
  b: number;
  c: number;
}

const Home: NextPage = () => {
  const [triangle, setTriangle] = useState<ITriangle>({a: 30, b: 40, c: 50});

  const applyPythagoreanTheorem = () => {
    return (
      (triangle.a * triangle.a) === (triangle.b * triangle.b) + (triangle.c * triangle.c)
      || (triangle.b * triangle.b) === (triangle.a * triangle.a) + (triangle.c * triangle.c)
      || (triangle.c * triangle.c) === (triangle.a * triangle.a) + (triangle.b * triangle.b)
        ? 'Triângulo Retângulo'
        : 'Não é um triângulo retângulo'
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <input type="number" min={1} onChange={e => setTriangle({...triangle, a: parseFloat(e.target.value)})} value={triangle.a}/>
        <input type="number" min={1} onChange={e => setTriangle({...triangle, b: parseFloat(e.target.value)})} value={triangle.b}/>
        <input type="number" min={1} onChange={e => setTriangle({...triangle, c: parseFloat(e.target.value)})} value={triangle.c}/>

        <div>
          <input
            type="range"
            min={0}
            max={100}
            value={triangle.a}
            onChange={e => setTriangle({...triangle, a: parseInt(e.target.value)})}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={triangle.b}
            onChange={e => setTriangle({...triangle, b: parseInt(e.target.value)})}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={triangle.c}
            onChange={e => setTriangle({...triangle, c: parseInt(e.target.value)})}
          />
        </div>

        <div className={triangleStyles.triangleContainer}>
          <div 
            className={triangleStyles.triangle}
            style={{
              borderTopWidth: `${triangle.a}px`,
              borderBottomWidth: `${triangle.b}px`,
              borderLeftWidth: `${triangle.c}px`,
            }}
          />
        </div>

        <h1>{applyPythagoreanTheorem()}</h1>
      </div>
    </div>
  )
}

export default Home
