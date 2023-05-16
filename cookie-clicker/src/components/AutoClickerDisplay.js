import clickerImg from './clicker.png';
import './AutoClickerDisplay.css';
import GetCookieSize from './GetCookieSize';

const AutoClickerDisplay = ({
  tier1AutoClickers,
  tier2AutoClickers,
  tier3AutoClickers,
}) => {
  // Calculates the margin for tier-1 auto-clickers
  const getTier1Margin = () => {
    // Calculates the negative margin based on the height of the '.count-display' element and cookie size
    const calculatedMargin =
      -1 *
      (document.querySelector('.count-display').clientHeight +
        GetCookieSize() / 2 +
        25);
    return {
      '--calc-margin': `${calculatedMargin}px`,
    };
  };

  // Generates tier-1 auto-clicker images
  const getTier1 = () => {
    let content = [];
    const maxClickerDisplay = Math.min(tier1AutoClickers, 20);

    // Loop to generate auto-clicker images
    for (let i = 0; i < maxClickerDisplay; i++) {
      // Calculate the position of each auto-clicker image in a circular pattern
      const radius = GetCookieSize() + 10; // 'px' :Radius should be slightly larger than the size of the cookie
      const increment = Math.PI / 10; // Increment angle for each auto-clicker image
      const position = {
        x: Math.sin(increment * i) * radius,
        y: Math.cos(increment * i) * radius * -1,
      };

      // Define the style for each auto-clicker image
      const style = {
        '--animation-order': i, // Custom CSS variable for animation order
        marginLeft: `${position.x}px`, // Horizontal position using marginLeft
        marginTop: `${position.y}px`, // Vertical position using marginTop
        rotate: `${(i - i / 2) * increment * 2}rad`, // Rotation angle
      };

      // Push each auto-clicker image with its corresponding style to the content array
      content.push(
        <img
          key={`tier1-${i}`}
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
    // Render the auto-clicker display if there are any auto-clickers
    return (
      <div className="clicker-displays">
        <div className="tier-1 wave" style={getTier1Margin()}>
          {getTier1()}
        </div>
      </div>
    );
  } else {
    // Render an empty div if there are no auto-clickers
    return <div></div>;
  }
};

export default AutoClickerDisplay;
