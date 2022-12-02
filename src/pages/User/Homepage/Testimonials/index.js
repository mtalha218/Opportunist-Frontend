import { Container } from "react-bootstrap";

import "./index.css";
const TestimonialSection = () => {
  return (
    <>
      <Container fluid="md" className="mb-3">
        <section className="testimonials">
          <h3 className="title">Testimonials from our adventurers:</h3>
          <hr />
          <p className="quote">
            Wow! This tour made me realize how much I love being outside with my
            friends. After going on one of these tours, I can safely say that
            beer pong is my favorite game all time, also the cultural programs
            were really interesting!
          </p>
          <p className="author">- Albert Herter</p>
          <p className="quote">
            Wow, this really blew my mind. We had so much fun at the beach, and
            also some hidden secrets revealed. Come on, I'm living in this city
            for 5 years. Amazing!
          </p>
          <p className="author">- Sharon Rosenberg</p>
          <p className="quote">
            If you want to understand your friends better, head to the
            mountains. I mean, seriously. It's like sitting next to a campfire
            and just talk in the sunset, woah. You know? It's like that.
          </p>
          <p className="author">- Luis Mendoza</p>
        </section>
      </Container>
    </>
  );
};

export default TestimonialSection;
