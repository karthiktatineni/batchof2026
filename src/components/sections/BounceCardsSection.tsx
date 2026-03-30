import BounceCards from '@/components/ui/BounceCards';
import styles from './BounceCardsSection.module.css';

export default function BounceCardsSection() {
  const images = [
    "https://picsum.photos/400/400?grayscale",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
    "https://picsum.photos/700/700?grayscale",
    "https://picsum.photos/300/300?grayscale"
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  return (
    <section className={`section ${styles.section}`} id="bounce-cards">
      <div className={`container ${styles.container}`}>
        <div className={styles.textContent}>
          <div className="section-label reveal">The Middle Years</div>
          <h2 className="reveal">
            Chaos, Laughter, & Connections
          </h2>
          <p className={styles.sectionDesc}>
            Those nights before submissions where logic faded and only adrenaline remained. The moments we realized the friends we made were worth the stress.
          </p>
          <div className={`divider reveal`} />
        </div>
        
        <div className={styles.cardsWrapper}>
          <BounceCards
            className="custom-bounceCards reveal"
            images={images}
            containerWidth={500}
            containerHeight={250}
            animationDelay={0.2}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </div>
      </div>
    </section>
  );
}
