import React, { useEffect } from 'react';
import './styles/ComboMeter.css';

const comboLimits = {
  low: 40,
  mid: 110,
  high: 140,
};

const ComboMeter = ({
  comboCount,
  setComboCount,
  comboMultiplier,
  setComboMultiplier,
}) => {
  useEffect(() => {
    switch (true) {
      case comboCount >= comboLimits.high:
        setComboMultiplier(5);
        break;
      case comboCount >= comboLimits.mid:
        setComboMultiplier(3);
        break;
      case comboCount >= comboLimits.low:
        setComboMultiplier(2);
        break;
      default:
        setComboMultiplier(1);
        break;
    }
  }, [comboCount, setComboMultiplier]);

  useEffect(() => {
    if (comboCount > 0) {
      const interval = setInterval(() => {
        setComboCount((prevCount) => Math.floor(prevCount * 0.95));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [comboCount, setComboCount]);

  return (
    <div className="combo-meter-container" data-testid="combo-meter-container">
      <div className="combo-multiplier">COMBO: x{comboMultiplier}!</div>
      <meter
        className="combo-meter"
        min={0}
        low={comboLimits.low}
        high={comboLimits.mid}
        optimum={comboLimits.high}
        max={200}
        value={comboCount}
      ></meter>
    </div>
  );
};

export default ComboMeter;
