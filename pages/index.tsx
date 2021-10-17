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
  const [numberOfSidesCalculated, setNumberOfSidesCalculated] = useState<number>(0);
  const [theme, setTheme] = useState<number>(0);

  const getBiggerTriangleSize = () => {

    return (
      triangle.a >= triangle.b
        ? triangle.a
        : triangle.b
    )
  }

  const applyPythagoreanTheorem = () => {
    if (numberOfSidesCalculated !== 3) {
      return;
    }
    const calculatedHypotenuse = Math.fround(Math.pow(triangle.h, 2));
    const isRectangle = calculatedHypotenuse === Math.fround((Math.pow(triangle.a, 2)) + (Math.pow(triangle.b, 2)));

    return (
      <p
        className={triangleStyles.isRectangleText}
        style={{
          color: isRectangle
            ? 'var(--theme-color-success)'
            : 'var(--theme-color-danger)'
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
    if (numberOfSidesCalculated === 2) {
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

  const renderTriangle = () => {

    return (
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
    )
  }

  useEffect(() => {
    setTheme(parseInt(window.localStorage.getItem('theme') || '0'));
  }, [])

  useEffect(() => {
    /* Dark */
    if(theme % 2 > 0){
      document.documentElement.style.setProperty("--color-black", '#FFFF');    
      document.documentElement.style.setProperty("--color-white", "#212121");
      document.documentElement.style.setProperty("--theme-color-danger", "var(--color-red2)");
    }
    /* Light */
    else {
      document.documentElement.style.setProperty("--color-black", '#212121');    
      document.documentElement.style.setProperty("--color-white", "#FFFF");
      document.documentElement.style.setProperty("--theme-color-danger", "var(--color-red)");
    }

    window.localStorage.setItem('theme', theme.toString());

  }, [theme]);

  useEffect(() => {
    let calculatedSidesCounter = 0;
    if (triangle.a) calculatedSidesCounter += 1;
    if (triangle.b) calculatedSidesCounter += 1;
    if (triangle.h) calculatedSidesCounter += 1;

    setNumberOfSidesCalculated(calculatedSidesCounter);

  }, [triangle])

  return (
    <div className={styles.pageWrapper}>
      <div onClick={() => setTheme(theme + 1)} className={`${styles.actionButton} ${styles.actionButton_themeChanger}`}>
        <span>Mudar tema</span>
      </div>
      <div className={styles.container}>

        {renderTriangle()}

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
              <span onClick={() => setTriangle({...triangle, a: NaN})} >Limpar</span>
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
              <span onClick={() => setTriangle({...triangle, b: NaN})} >Limpar</span>
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
              <span onClick={() => setTriangle({...triangle, h: NaN})} >Limpar</span>
            </div>
          </div>

        </div>

        {renderCalculateThirdSide()}

      </div>
      <div className={`${styles.actionButton} ${styles.actionButton_link}`}>
        <a 
          target={'_blank'}
          rel="noreferrer"
          href={'https://guipo.notion.site'}
        >
          Entrar em contato
          </a>
      </div>
    </div>
  )
}

export default Home
