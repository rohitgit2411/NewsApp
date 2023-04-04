import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 15,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props){
        super(props);
        console.log("Constructor fro news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title=`${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} - NewXite`
    } 

    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=578129a379cb4f4793d1218386931b9f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews()
    }

    handleNextClick = async() =>{
        this.setState({page: this.state.page+1});
        this.updateNews()
    }

    handlePrevClick = async() =>{
        this.setState({page: this.state.page-1});
        this.updateNews()
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=578129a379cb4f4793d1218386931b9f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page+1});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults
        })
      };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: '30px 0px', marginTop: '95px'}}>NewXite - Top Headline | {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container my-3">
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name}/>
                    </div>

                })}
                </div>
            </div> 
        </InfiniteScroll>

        
        </>   
    )
  }
}

export default News
