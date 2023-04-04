import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {

  render() {
      let {title, description, imageUrl, newsUrl, date, source}=this.props;  
    return (
      <div>
          <div className="card my-2" style={{width: "24rem"}}>
            <img src={!imageUrl?"https://www.freeiconspng.com/uploads/no-image-icon-6.png":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <span class="badge bg-danger">{source}</span>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">Published @ {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn bt-sm btn-primary">continue read... </a>
                
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
