import React, { Component , Fragment } from "react";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import Slider from "react-slick";
import { slideSlick } from "../page-demo/script";
import SliderOne from "../component/slider/SliderOne";
import ServiceTwo from "../elements/service/ServiceTwo";
import CounterOne from "../elements/counters/CounterOne";
import Testimonial from "../elements/Testimonial";
import About from "../component/HomeLayout/homeOne/About";
import Portfolio from "../component/HomeLayout/homeOne/Portfolio";
import BlogContent from "../elements/blog/BlogContent";
import BrandTwo from "../elements/BrandTwo";
import Helmet from "../component/common/Helmet";
import ModalVideo from 'react-modal-video';
import { FiCheck } from "react-icons/fi";
import PortfolioList from "../elements/portfolio/PortfolioList";
import Team from "../elements/Team";

const SlideList = [
    {
        textPosition: 'text-left',
        bgImage: 'bg_image--17',
        category: '',
        title: 'Grow busine.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    },
    {
        textPosition: 'text-left',
        bgImage: 'bg_image--18',
        category: '',
        title: 'Development.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    },
    {
        textPosition: 'text-left',
        bgImage: 'bg_image--19',
        category: '',
        title: 'Marketing.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    }
]

class MainDemo extends Component{
    constructor (props) {
        super(props)
        this.state = {
            isOpen: false
        }
        this.openModal = this.openModal.bind(this);
    }
    openModal () {
        this.setState({isOpen: true})
    }
    render(){
        var namesItemOne = [
            'The Philosophy Of business analytics',
            'Fast-Track Your business',
            'Lies And Damn Lies About business',
            'The Ultimate Deal On business',
        ];
        var namesItemTwo = [
            'Proof That business Really Works',
            'Here Is What You Should Do For Your business',
            'The Hidden Mystery Behind business',
        ];
        const PostList = BlogContent.slice(0 , 3);
        return(
            <Fragment> 
                <Helmet pageTitle="Zeevoc Enterprise" />
                <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

                   {/* Start Slider Area  un comment for slider  */}
                   {/* <div className="slider-wrapper">
                    <div className="slider-activation">
                        <Slider className="rn-slick-dot dot-light" {...slideSlick}>
                            {SlideList.map((value , index) => (
                                <div className={`slide slide-style-2 d-flex align-items-center justify-content-center bg_image ${value.bgImage}`} key={index} data-black-overlay="8">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className={`inner ${value.textPosition}`}>
                                                    {value.category ? <span>{value.category}</span> : ''}
                                                    {value.title ? <h1 className="title">{value.title}</h1> : ''}
                                                    {value.description ? <p className="description">{value.description}</p> : ''}
                                                    {value.buttonText ? <div className="slide-btn"><a className="rn-button-style--2 btn-solid" href={`${value.buttonLink}`}>{value.buttonText}</a></div> : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div> */}
                </div>
                {/* End Slider Area   */}

                {/* Start Slider Area   */}
            <div className="active-dark"> 
                
                <div className="slider-wrapper">
                    <SliderOne />
                </div>
                {/* End Slider Area   */}

                {/* Start About Area */}
                {/* <div className="about-area about-position-top pb--120 bg_color--1">
                    <About />
                </div> */}
                {/* End About Area */}

                {/* Start About Area  */}
                <div className="rn-about-area ptb--120 bg_color--1">
                    <div className="container">
                        <div className="row row--35 align-items-center">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <div className="about-inner inner">
                                    <div className="section-title">
                                        <h2 className="title">About</h2>
                                        <p className="description">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
                                    </div>
                                    <div className="mt--30">
                                        <h4>Lorem ipsum dolor sit.</h4>
                                        <ul className="list-style--1">
                                            {namesItemOne.map((name, index) => {
                                                return <li key={ index }><FiCheck /> {name}</li>;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="mt--30">
                                        <h4>Lorem ipsum dolor sit.</h4>
                                        <ul className="list-style--1">
                                            {namesItemTwo.map((name, index) => {
                                                return <li key={ index }><FiCheck /> {name}</li>;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="thumbnail position-relative">
                                    <img className="w-100" src="/assets/images/about/about-3.png" alt="About Images"/>
                                    <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='ZOoVOfieAF8' onClose={() => this.setState({isOpen: false})} />
                                    <button className="video-popup position-top-center theme-color" onClick={this.openModal}><span className="play-icon"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End About Area  */}

                {/* Start Service Area  */}
                <div className="service-area ptb--80  bg_image bg_image--3">
                   <div className="container">
                        <ServiceTwo />
                   </div>
                </div>
                {/* End Service Area  */}

                {/* Start Portfolio Area */}
                {/* <div className="portfolio-area ptb--120 bg_color--1">
                    <div className="portfolio-sacousel-inner mb--55">
                        <Portfolio />
                    </div>
                </div> */}
                {/* End Portfolio Area */}

                
                {/* Start Portfolio Area */}
                {/* <div className="portfolio-area ptb--120 bg_color--5">
                    <div className="portfolio-sacousel-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                                        <h2 className="title">Our Project</h2>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <PortfolioList styevariation="text-left mt--40" column="col-lg-4 col-md-6 col-sm-6 col-12" item="6" />
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="view-more-btn mt--60 text-center">
                                        <a className="rn-button-style--2 btn-solid" href="/portfolio"><span>View More Project</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* End Portfolio Area */}

                {/* Start Team Area  */}
                {/* <div className="rn-team-area ptb--120 bg_color--1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title service-style--3 text-center mb--25 mb_sm--0">
                                    <h2 className="title">Skilled Team</h2>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <Team column="col-lg-4 col-md-6 col-sm-6 col-12" />
                        </div>
                    </div>
                </div> */}
                {/* End Team Area  */}

                {/* Start CounterUp Area */}
                {/* <div className="rn-counterup-area pt--25 pb--110 bg_color--1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="fontWeight500">Our Fun Facts</h3>
                                </div>
                            </div>
                        </div>
                        <CounterOne />
                    </div>
                </div> */}
                {/* End CounterUp Area */}

                {/* Start Testimonial Area */}
                {/* <div className="rn-testimonial-area bg_color--5 ptb--120">
                    <div className="container">
                        <Testimonial />
                    </div>
                </div> */}
                {/* End Testimonial Area */}

                {/* Start Blog Area */}
                <div className="rn-blog-area pt--120 bg_color--1 mb-dec--30">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="section-title text-left">
                                    <h2>Latest News</h2>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="blog-btn text-left text-lg-right mt_sm--10 mt_md--10">
                                    <a className="btn-transparent rn-btn-dark" href="/blog"><span className="text">View All News</span></a>
                                </div>
                            </div>
                        </div>
                        <div className="row mt--60 mt_sm--40">
                            {PostList.map((value , i ) => (
                                <div className="col-lg-4 col-md-6 col-12" key={i}>
                                    <div className="blog blog-style--1">
                                        <div className="thumbnail">
                                            <a href="/blog-details">
                                                <img className="w-100" src={`/assets/images/blog/blog-${value.images}.jpg`} alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="content">
                                            <p className="blogtype">{value.category}</p>
                                            <h4 className="title"><a href="/blog-details">{value.title}</a></h4>
                                            <div className="blog-btn">
                                                <a className="rn-btn text-white" href="/blog-details">Read More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>    
                    </div>    
                </div>
                {/* End Blog Area */}

                {/* Start Brand Area */}
                {/* <div className="rn-brand-area brand-separation pb--120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <BrandTwo />
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* End Brand Area */}
                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}
                
                <Footer />
                
            </div>
            </Fragment> 

        )
    }
}
export default MainDemo;