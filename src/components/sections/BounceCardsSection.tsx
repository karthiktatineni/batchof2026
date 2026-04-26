import BounceCards from '@/components/ui/BounceCards';
import styles from './BounceCardsSection.module.css';
import { getCdnUrl } from '@/utils/cdn';

export default function BounceCardsSection() {
  const images: string[] = [];

    const transformStyles = [
      "rotate(15deg) translate(-220px, -150px)",
      "rotate(8deg) translate(-110px, -220px)",
      "rotate(0deg) translate(0, -260px)",
      "rotate(-8deg) translate(110px, -220px)",
      "rotate(-15deg) translate(220px, -150px)"
    ];

    if (images.length === 0) return null;

    const cdnImages = images.map(img => getCdnUrl(img));

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
              images={cdnImages}
              containerWidth={600}
              containerHeight={300}
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
