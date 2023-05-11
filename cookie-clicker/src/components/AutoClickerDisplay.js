import clickerImg from './clicker.png';
import './AutoClickerDisplay.css';

const AutoClickerDisplay = ({
  tier1AutoClickers,
  tier2AutoClickers,
  tier3AutoClickers,
}) => {
  const getTier1 = () => {
    let content = [];
    const maxClickerDisplay = Math.min(tier1AutoClickers, 20);

    for (let i = 0; i < maxClickerDisplay; i++) {
      const radius = 330;
      const increment = Math.PI / 10;
      const position = {
        x: Math.sin(increment * i) * radius,
        y: Math.cos(increment * i) * radius * -1,
      };
      const style = {
        '--animation-order': i,
        marginLeft: `${position.x}px`,
        marginTop: `${position.y}px`,
        rotate: `${(i - i / 2) * increment * 2}rad`,
      };
      content.push(
        <img
          src={clickerImg}
          alt="auto-clicker"
          className="wave-row"
          style={style}
        />
      );
    }

    return content;
  };

  if (tier1AutoClickers + tier2AutoClickers + tier3AutoClickers > 0) {
    return (
      <div className="clicker-displays">
        <div className="tier-1 wave">{getTier1()}</div>
      </div>
    );
  } else return <div></div>;
};

export default AutoClickerDisplay;
