import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  value: '',
                  totalpages: 0,
                  currentpage: 0,
                  data: []
                }
    //var p;
    this.handleChange = this.handleChange.bind(this);
    this.fetchresult = this.fetchresult.bind(this);
  }
  
  handleChange(event) {
    event.preventDefault() ;
    this.setState({value: event.target.value});
    this.fetchdetails(0);

  }
  componentDidMount(){
    this.fetchdetails(0) ;
  }
  fetchdetails(page){
    this.setState({currentpage:page});
    fetch('https://hn.algolia.com/api/v1/search?query='+this.state.value+'&page='+page)
    .then(response => response.json())
    .then(datas =>{
      this.setState({
        data: datas.hits,
        totalpages: datas.nbPages
      })
      console.log(datas) ;
      this.getdata();
    }
    )
    .catch(error => this.setState({ error}));
  }
  fetchresult(event){
    this.props.history.push('/home/search/'+this.state.value) ;
    event.preventDefault();
    console.log('fetching...');
    this.fetchdetails(0) ;
  }
  geturl(url1,url2,it){
    if((url1 === null || url1 === "") && (url2 === null || url2 === "")){
      return (<span><br/></span>);
    }
    else if(url1 === null || url1 === ""){
        return <a className='link size' href={url2}>| {url2}</a> 
    }else if(url2 === null || url2 === ""){
        return <a className='link size' href={url1}>| {url1}</a>
    }
  }
  getheading(h1,h2){
       if(h1 === null || h1 === ""){
          return <span>{h2}</span>
      }else if(h2 === null || h2 === ""){
          return <span>{h1}</span>
      }
  }
  getdatatoshow(item,i){
    if((item.title === null || item.title === "") && (item.story_title === null || item.story_title === "")){
      return;
    }else{
    return(
    <p className='addborder' key={i} >
        <a className='link' href={item.story_url}>{this.getheading(item.story_title,item.title)}</a><br/>
        <span className='size'>{item.points} points | {item.author} | {item.created_at.substring(0,10)} | {item.num_comments} comments </span> {this.geturl(item.story_url,item.url,item.story_text)}
    </p>
    );
    }
  }
  getdata(){
    return this.state.data.map((item,i) => (
      this.getdatatoshow(item,i)
  ))
  }
setcurrent(page){
  this.setState({currentpage: page});
}
getprevious(){
  if(this.state.currentpage > 0){
  return <button onClick={()=>this.decrement()} className='btn btn-default addallborder'>pr</button>
  }
}
getnext(){
  if(this.state.currentpage < this.state.totalpages-1){
  return <button onClick={() => this.increment()} className='btn btn-default addallborder'>nx</button>
}
}
increment(){
  if(this.state.currentpage < this.state.totalpages){
  console.log(this.state.currentpage);
  var p = this.state.currentpage ;

  this.fetchdetails(this.state.currentpage+1) ;
  this.setState({currentpage : ++p});
  console.log(this.state.currentpage);
}
}
decrement(){
  if(this.state.currentpage>0){
    console.log(this.state.currentpage);
    var p = this.state.currentpage ;
  
    this.fetchdetails(this.state.currentpage-1) ;
    this.setState({currentpage : --p});
    console.log(this.state.currentpage);
}
}
getlabel(){
      var a=[]
      if(this.state.totalpages <=5){
      for(var i = 1 ; i <= this.state.totalpages ;i++){
        a.push(i) ;
      }
      console.log(a) ;
      return (
        a.map((ind,id)=>(
        <button key={id} onClick={() => this.fetchdetails(ind-1)} className='btn btn-default addallborder'>{ind}</button>
        ))
       );
        }else{
          return(
            <div>
              {this.getprevious()}
          <button onClick={() => this.fetchdetails(0)} className='btn btn-default addallborder'>1</button>
          <button onClick={() => this.fetchdetails(1)} className='btn btn-default addallborder'>2</button>
          <button onClick={() => this.fetchdetails(2)} className='btn btn-default addallborder'>3</button>
          <button onClick={() => this.fetchdetails(3)} className='btn btn-default addallborder'>4</button>
          <button onClick={() => this.fetchdetails(4)} className='btn btn-default addallborder'>5</button>
          <span>......</span>
          <button onClick={() => this.fetchdetails(this.state.totalpages-1)} className='btn btn-default addallborder'>{this.state.totalpages}</button>
          {this.getnext()}
            </div>
          )
        }
}

  render() {
      return (
        <div className='App container'>
        <div className ='topHeader '>
        <div className="row">
        <div className='col-sm-3  aligntext' >
            SEARCH<br/>
            {localStorage.getItem("username")}
        </div>
        <div className='col-sm-6'>
        <form  onSubmit = {this.fetchresult} >
          <input className= 'form-control' type='text' placeholder='search stories by title,author or url' value={this.state.value} onChange={this.handleChange}/>
        </form>
        </div>
        <div className='col-sm-3'>
        
        </div>
        </div>
        </div>
        <div className='data'>
        {this.getdata()}
        
        </div>
        <div>
        {this.getlabel()}
        </div>
        </div>
      );
      } 
}

export default App;
