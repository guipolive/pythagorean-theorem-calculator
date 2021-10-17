import type { NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'

/* Styles */
import styles from '../styles/index.module.css';
import triangleStyles from '../styles/triangle.module.css';

interface ITriangle {
  h: number;
  a: number;
  b: number;
}

const Home: NextPage = () => {
  const [triangle, setTriangle] = useState<ITriangle>({h: 50, a: 30, b: 40});
  const [isTriangleCalculated, setIsTriangleCalculated] = useState<number>(0);

  const getBiggerTriangleSize = () => {

    return (
      triangle.a >= triangle.b
        ? triangle.a
        : triangle.b
    )
  }

  const applyPythagoreanTheorem = () => {
    if (isTriangleCalculated !== 3) {
      return;
    }
    const calculatedHypotenuse = Math.fround(Math.pow(triangle.h, 2));
    const isRectangle = calculatedHypotenuse === Math.fround((Math.pow(triangle.a, 2)) + (Math.pow(triangle.b, 2)));

    return (
      <p
        className={triangleStyles.isRectangleText}
        style={{
          color: isRectangle
            ? '#09A70F'
            : '#A74209'
        }}
      >
        {isRectangle
          ? 'É um triângulo retângulo!'
          : 'Não é um triângulo retângulo...'
        }
      </p>
    )
  }

  const handleUpdateInput = (e: ChangeEvent<HTMLInputElement>, min: number, max: number) => {
    let newValue = parseInt(e.target.value);

    if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    return newValue;
  }

  const renderCalculateThirdSide = () => {
    if (isTriangleCalculated === 2) {
      return <p onClick={calculateThirdSide} className={styles.calculateThirdSide}>Calcular terceiro lado</p>;
    }
  }

  const calculateThirdSide = () => {
    if (triangle.h) {
      if (triangle.a) {
        setTriangle({...triangle, b: Math.fround(Math.sqrt((Math.pow(triangle.h, 2)) - (Math.pow(triangle.a, 2))))})
      } else {
        setTriangle({...triangle, a: Math.fround(Math.sqrt((Math.pow(triangle.h, 2)) - (Math.pow(triangle.b, 2))))})
    }
    } else {
      setTriangle({...triangle, h: Math.sqrt(Math.pow(triangle.a, 2) + (Math.pow(triangle.b, 2)))})
    }
  }

  useEffect(() => {
    let calculatedSidesCounter = 0;
    if (triangle.a) calculatedSidesCounter += 1;
    if (triangle.b) calculatedSidesCounter += 1;
    if (triangle.h) calculatedSidesCounter += 1;

    setIsTriangleCalculated(calculatedSidesCounter);

  }, [triangle])

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        <div className={triangleStyles.triangleContainer}>
          <div 
            className={triangleStyles.triangle}
            style={{
              borderLeftWidth: `${triangle.a}px`,
              borderRightWidth: `${triangle.b}px`,
              borderBottomWidth: `${triangle.h}px`,
            }}
          />

          {applyPythagoreanTheorem()}
          
        </div>

        <div className={styles.inputs}>
          <div className={styles.inputs__row}>
            <p className={styles.inputs__row__title}>Lado A</p>
            <div className={styles.inputs__row__actions}>
              <input
                type="range"
                min={1}
                max={triangle.h - 1}
                value={triangle.a}
                onChange={e => setTriangle({...triangle, a: parseInt(e.target.value)})}
              />
              <input
                type="number"
                min={1}
                max={triangle.h - 1}
                onChange={e => setTriangle({...triangle, a: handleUpdateInput(e, 1, triangle.h - 1)})} value={triangle.a}
              />
            </div>
          </div>
          
          <div className={styles.inputs__row}>
            <p className={styles.inputs__row__title}>Lado B</p>
            <div className={styles.inputs__row__actions}>
              <input
                type="range"
                min={1}
                max={triangle.h - 1}
                value={triangle.b}
                onChange={e => setTriangle({...triangle, b: parseInt(e.target.value)})}
              />
              <input
                type="number"
                min={1}
                max={triangle.h - 1}
                onChange={e => setTriangle({...triangle, b: handleUpdateInput(e, 1, triangle.h - 1)})} value={triangle.b}
              />
            </div>
          </div>
            
          <div className={styles.inputs__row}>
            <p className={styles.inputs__row__title}>Hipotenusa</p>
            <div className={styles.inputs__row__actions}>
              <input
                type="range"
                min={getBiggerTriangleSize() + 1}
                disabled={getBiggerTriangleSize() >= 99}
                max={100}
                value={triangle.h}
                onChange={e => setTriangle({...triangle, h: parseInt(e.target.value)})}
              />
              <input
                type="number"
                min={1}
                max={100}
                onChange={e => setTriangle({...triangle, h: handleUpdateInput(e, 1, 100)})} value={triangle.h}
              />
            </div>
          </div>

        </div>

        {renderCalculateThirdSide()}

      </div>
    </div>
  )
}

export default Home
