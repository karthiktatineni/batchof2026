'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MessagesWall.module.css';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  { id: 1, text: "My experience in our college has been truly memorable and meaningful. It was not just a place for studying, but a place where I grew as a person. From the very first day, I got the chance to meet new people who slowly became my close friends. Together, we shared so many moments.", author: "Mudili Jahnavi" },
  { id: 2, text: "College life gave me everything: friends who became family, memories that turned into stories and a little bit of love that taught me so much. Now all that's left are memories and a heart full of gratitude. Missing all you guys more than words can say. 💙", author: "Perugu Pavan Sri Manikanta" },
  { id: 3, text: "College life includes happiness, stress, excitement, and sometimes confusion.", author: "Gongalla Mayuri" },
  { id: 4, text: "Wonderful memories with Wonderful people in an amazing college.", author: "Mohammed Abubaker" },
  { id: 5, text: "Enjoyed a lot!", author: "Santi Preetham" },
  { id: 6, text: "Made a lot of friends and had a lot of experiences.", author: "Lingam Lakshmi Vagdevi" },
  { id: 7, text: "I hate my college for the struggles and backlogs it gave me, but I can't ignore the fact that it gave me the best friends I could ever ask for. They turned my worst days into something worth remembering.", author: "Allada Koushik" },
  { id: 8, text: "Good", author: "Danagouni Nikhil Kumar Goud" },
  { id: 9, text: "This college has given me so many memories and made the best people my friends. Those lab jokes, bunking classes, movies, and cricket... college has given me a family. Thank you, IARE ECE-B.", author: "Bussu Krishna" },
  { id: 10, text: "Dear IARE... Thanks for giving me mental trauma first 🙃 and then Capgemini!! Last! 🥹", author: "Maloth Lavanya" },
  { id: 11, text: "College gave us a future, but friends gave us a reason to enjoy the present.", author: "Gatla Nagaraju" },
  { id: 12, text: "College life wasn't perfect, but it was real. It broke me, shaped me, and slowly turned me into a stronger and more mature person. I lost a few things, but I gained clarity, lessons, and memories that will stay forever.", author: "Edha Meghana" },
  { id: 13, text: "We walked into this campus as students and walked out as versions of ourselves we never expected to be. That transformation — that's the real degree.", author: "Lakkakula Lohith" },
  { id: 14, text: "Overall, my B.Tech journey has been a blend of challenges, growth, strong friendships, and memorable experiences that will always remain close to my heart.", author: "Hatkar Lithik Raj" },
  { id: 15, text: "The best part of college wasn't the degree, it was the friends who stayed through every up and down. Late nights, silly jokes, last-minute studies… everything feels special because of you guys.", author: "Bolem Mounika" },
  { id: 16, text: "The time you spent on campus was more than just a sequence of classes; it was the backdrop for a profound transformation. Every image is a testament to the person you were then and the resilient individual you were becoming.", author: "Balla Kanth Naga Ayyappa" },
  { id: 17, text: "Maybe college isn't the right place for me, but it gave me the right people.", author: "Kancharla Mahesh" },
  { id: 18, text: "I may not have a lot of “everyday college fun” memories, but I do have my own kind of experience—less crowded, a bit disconnected, but still meaningful in its own way.", author: "Padigela Kalyani" },
  { id: 19, text: "College = Friends, studies, enjoyment, memories. Because of our college we met each other and made best memories. I will definitely miss you all 🖤", author: "Alyana Pradeep Kumar" },
  { id: 20, text: "It's good.", author: "Chowdharigari Pavani" },
  { id: 21, text: "Btech life became hard due to some persons and also it became easy due to other persons. Btech life gave many memories as well as many life lessons.", author: "Ballu Manikanta" },
  { id: 22, text: "The best memories came from simple things: silly bunks, canteen hangouts, small breaks that somehow turned into the best parts of the day. I'm leaving with more than just a degree.", author: "Penkey Mahitha" },
  { id: 23, text: "This college has not only shaped my technical knowledge but also gifted me lifelong relationships and unforgettable experiences.", author: "Devana Niranjan" },
  { id: 24, text: "These years have been some of the most beautiful moments of my life, turning an unfamiliar place into my second home. It gave me memories, friendships, and lessons I will always cherish.", author: "Podakanti Hema Sri" },
  { id: 25, text: "College life is one of the most memorable phases of my life. It's a phase where we learn, struggle, enjoy, and grow. IARE has given me memories and experiences for life ❤️", author: "Kondakala Priyanka" },
  { id: 26, text: "Nenu adagani Yudhdhammm... Naaku Telini prapanchammmm... Ofcourseee, Life is Litee, manak enduk broo college.", author: "M Likith Mahendra" },
  { id: 27, text: "Found not just lessons, but unexpected bonds that turned into forever friendships 🫶 Walking away with memories I'll never forget, lessons I'll always carry.", author: "Boddu Pranathi" },
  { id: 28, text: "ECE-B will always be my favorite. It is filled with special people, and I feel deeply connected to it. It will forever remain a very special chapter of my life.", author: "Rasamalla Meghana" },
  { id: 29, text: "Four years passed in the blink of an eye. There were ups and downs, but regardless of everything, I had some of the greatest moments of my life here.", author: "Gopu Nandini" },
  { id: 30, text: "Memories that stay forever.", author: "Killi Murali Krishna" },
  { id: 31, text: "Every moment of classes, late-night studies, canteen talks, bunks, and crazy memories with friends stayed slow and special in my heart 🩷🩷", author: "Neelam Sindhu" },
  { id: 32, text: "4 years of class = 50% studies, 50% fun 😂 From last bench talks to last minute exams, everything was memorable. Best time ever!", author: "Bandi Pavan Sai" },
  { id: 33, text: "My friends are the best part of my college life. We study together, laugh a lot, and support each other in everything.", author: "Diddakuntla Nithin Reddy" },
  { id: 34, text: "From nervous first days to confident final year, IARE has been a beautiful journey I’ll never forget.", author: "Pallepaga Hymavathi" },
  { id: 35, text: "College was all about friendships, fun, last-minute assignments, bunks, and memories we’ll cherish forever.", author: "Dantuluri Padma Priya" },
  { id: 36, text: "A beautiful journey with lots of memories. ✨", author: "Konka Likhitha" },
];

export default function MessagesWall() {
  return (
    <section className={`section ${styles.section}`} id="messages">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Student notes</div>
          <h2 className="reveal">The book</h2>
          <p className="reveal">Scribbles from the heart, digitized for eternity.</p>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...messages, ...messages].map((message, i) => {
              const yOffset = i % 3 === 0 ? '-40px' : i % 3 === 1 ? '40px' : '0px';
              const rotate = i % 2 === 0 ? '-4deg' : '4deg';

              return (
                <div
                  key={`msg-${i}`}
                  className={styles.messageCard}
                  style={{ transform: `translateY(${yOffset}) rotate(${rotate})` }}
                >
                  <div className={styles.quoteMark}>"</div>
                  <p className={styles.text}>{message.text}</p>
                  <p className={styles.author}>— {message.author}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
