import type { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { ITriangleResponseData, ITriangle } from '../model/Triangle';

/* Styles */
import styles from '../styles/index.module.css';
import triangleStyles from '../styles/triangle.module.css';
import { changeTheme } from '../utils/theme';

const Home: NextPage = () => {
  const [triangle, setTriangle] = useState<ITriangle>({h: 50, a: 30, b: 40});
  const [numberOfSidesCalculated, setNumberOfSidesCalculated] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [triangleResponse, setTriangleResponse] = useState<ITriangleResponseData>({} as ITriangleResponseData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBiggerTriangleSize = () => {
    return (
      triangle.a >= triangle.b
        ? triangle.a
        : triangle.b
    )
  }

  const testIfIsRectangle = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/calculate?a=${triangle.a}&b=${triangle.b}&h=${triangle.h}`);
    const data: ITriangleResponseData = await response.json();
    
    setTriangleResponse(data);
    setIsLoading(false);
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

  const renderCalculateThirdSide = () => {
    if (numberOfSidesCalculated === 2) {
      return <p onClick={calculateThirdSide} className={styles.calculateThirdSide}>Calcular terceiro lado</p>;
    }
  }

  const renderTriangleAnswer = () => {
    if (numberOfSidesCalculated !== 3) {
      return;
    }

    return (
      <p
        className={triangleStyles.isRectangleText}
        style={{
          color: triangleResponse.isRectangle
            ? 'var(--theme-color-success)'
            : 'var(--theme-color-danger)'
        }}
      >
        {isLoading ? 'Calculando...' : triangleResponse.message}
      </p>
    )
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
        {renderTriangleAnswer()}
        
      </div>
    )
  }

  const renderInputs = () => {
    return (
      <div className={styles.inputs}>
        <div className={styles.inputs__row}>
          <p className={styles.inputs__row__title}>Lado A <span>(esquerda)</span></p>
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
          <p className={styles.inputs__row__title}>Lado B <span>(direita)</span></p>
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
          <p className={styles.inputs__row__title}>Hipotenusa <span>(baixo)</span></p>
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
    )
  }

  /* Initializing Theme and IsRectangleAnswer */
  useEffect(() => {
    const currentTheme: 'light' | 'dark' = window.localStorage.getItem('theme') as 'light' | 'dark' ?? 'light';
    setTheme(currentTheme);

    testIfIsRectangle();
  }, [])

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  /* Counting number of triangle filled sides  */
  useEffect(() => {
    let calculatedSidesCounter = 0;

    if (triangle.a) calculatedSidesCounter += 1;
    if (triangle.b) calculatedSidesCounter += 1;
    if (triangle.h) calculatedSidesCounter += 1;

    setNumberOfSidesCalculated(calculatedSidesCounter);
  }, [triangle])
  
  useEffect(() => {
    if (numberOfSidesCalculated === 3) {
      testIfIsRectangle();
    }
  }, [triangle, numberOfSidesCalculated])

  return (
    <div className={styles.pageWrapper}>

      <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`${styles.actionButton} ${styles.actionButton_themeChanger}`}>
        <span>Mudar tema</span>
      </div>

      <div className={styles.container}>
        {renderTriangle()}
        {renderInputs()}
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

export default Home;
