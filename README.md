# ec2-userdata

Get the user data from an ec2 machine's hypervisor web interface, programmatilly or via command line

## Programmatically

```
 > npm install --save ec2-userdata
```


```javascript
var ec2UserData = require('ec2-userdata')

ec2UserData(function (err, data) {

})
```

### override hypervisor url 

```javascript
var ec2UserData = require('ec2-userdata')

ec2UserData({ hypervisorUrl: 'http://lalala' }, function (err, data) {

})
```

## Command line
```
 > npm install -g ec2-userdata
 > ec2-userdata
```
