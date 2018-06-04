---
layout: post
title: Uploading file in Vue.js
tags: TypeScript, Vue.js, JavaScript, ASP.NET Core
image: /public/img/vue.png
---
In this blog post I am going to show you how you can upload file using Vue.js. On the backend we will use ASP.NET Core MVC to expose an endpoint to the client to receive file. Let's say we have a HTML form for saving a coffee, this form contains a file input to accept coffee's image:

<img src="/public/img/vue-upload-file.png" alt="Vue Upload File" width="750">

To allow the user to pick a file we need to have a reference to the file input field using `ref` attribute then we can easily access this input using `$refs` object inside our Vue instance this is like selecting an element using jQuery:

{% highlight html %}
<input required type="file" ref="image">
{% endhighlight %}

As you can see we named this input `image` so we can access the element this way:

{% highlight js %}
this.$refs.image
{% endhighlight %}

Before we can submit the form we can encapsulate functionality inside a service:

{% highlight js %}
import axios from 'axios';

class CoffeeService {

    saveCoffee(coffee: any, file: any): any {
        const formData = new FormData();
        for (const key in coffee) {
            if (coffee.hasOwnProperty(key)) {
                formData.append(key, coffee[key]);
            }
        }
        formData.append(file.name, file);

        return axios.post('/Coffees/SaveCoffee', formData);
    }
}

// Export a singletone instance in the global namespace
export const coffeeService = new CoffeeService();
{% endhighlight %}

This service has a method called `saveCoffee` which accepts two parameters one is the coffee itself and the second one is uploaded file then we are using `FormData` to combine these data together and sending it to the server using `axios` library. Keep in mind, this method returns a promise which means that the caller can use `then` syntax to get server's response. So inside the `CoffeeComponent` we can use `Coffeeservice` like this:

{% highlight js %}
<template>
    <div class="container">
        <h3>Add a new Coffee</h3>
        <form v-on:submit.prevent="submitted">
            <div class="form-group">
                <label class="control-label">Coffee Name</label>
                <input required type="text" class="form-control" name="Name" v-model="model.name">
            </div>

            <div class="form-group">
                <label class="control-label">Coffee Type</label>
                <select class="form-control" name="CoffeeType" v-model="model.coffeeType">
                    <option v-for="coffeeType in coffeeTypes" :value="coffeeType.value" v-bind:key="coffeeType.value">{{ coffeeType.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Coffee Image</label>
                <input required type="file" multiple class="form-control" name="Image" @change="fileChange" ref="image">
            </div>

            <button class="btn btn-primary" type="submit">Save</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { coffeeService } from "../services/CoffeeService";
/// <reference path="./toaster.d.ts" />

@Component({
  components: { UploadFileSimpleComponent }
})
export default class UploadFileSimpleComponent extends Vue {
  coffeeTypes = [
    { name: "Espresso", value: 0 },
    { name: "Latte", value: 1 },
    { name: "Mocha", value: 2 }
  ];

  model = {};

  submitted() {
    coffeeService
      .saveCoffee(this.model, (<any>this.$refs.image).files)
      .then(function(response: any) {
        toastr.success(response.data);
      })
      .catch(function(error: any) {
        toastr.error(error);
      });
  }
}
</script>
{% endhighlight %}

###Showing upload progress
Now we want to show upload progress, axios makes this easy all we need to do is add a third argument to the `post` method, this argument is actually an object, inside this object we can configure the request inside this object we have access to an event handler called `onUploadProgress` which we can do the calculation. let's change the `CoffeeService` to this:

{% highlight js %}
import axios from 'axios';
import { eventBus } from '../main';

class CoffeeService {

    saveCoffee(coffee: any, file: any): any {
        const formData = new FormData();
        for (const key in coffee) {
            if (coffee.hasOwnProperty(key)) {
                formData.append(key, coffee[key]);
            }
        }

        formData.append(file.name, file);

        let startTime = Date.now();

        return axios.post('/Coffees/SaveCoffee', formData, {
            onUploadProgress: uploadEvent => {
                const queueProgress = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                const timeElapsed = Date.now() - startTime;
                const uploadSpeedFirst = uploadEvent.loaded / (timeElapsed / 1000);
                const uploadTimeRemaining = Math.ceil(
                    (uploadEvent.total - uploadEvent.loaded) / uploadSpeedFirst
                  );
                const uploadTimeElapsed = Math.ceil(timeElapsed / 1000);
                const uploadSpeed = uploadSpeedFirst / 1024 / 1024;

                eventBus.$emit('uploadData', {
                    queueProgress,
                    uploadTimeRemaining,
                    uploadTimeElapsed,
                    uploadSpeed
                });
            }
        });
    }
}

// Export a singletone instance in the global namespace
export const coffeeService = new CoffeeService();
{% endhighlight %}

Inside the method we construct an object, this object will notify all subscribers with current progress. This notification is done using `$emit` method. We also need to update the template to show this progress:

{% highlight html %}
<div v-if="uploadDetails.queueProgress > 0">
    <table class="table">
        <thead>
        <tr>
            <th width="15%">Event</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><strong>Elapsed time</strong></td>
            <td nowrap>{{uploadDetails.uploadTimeElapsed | number}} second(s)</td>
        </tr>
        <tr>
            <td><strong>Remaining time</strong></td>
            <td nowrap>{{uploadDetails.uploadTimeRemaining | number}} second(s)</td>
        </tr>
        <tr>
            <td><strong>Upload speed</strong></td>
            <td nowrap>{{uploadDetails.uploadSpeed | number}} MB/s</td>
        </tr>
        <tr>
            <td><strong>Queue progress</strong></td>
            <td>
            <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
                aria-valuemin="0" aria-valuemax="100" :aria-valuenow="uploadDetails.queueProgress"
                :style="{ 'width': uploadDetails.queueProgress + '%' }">
                {{uploadDetails.queueProgress}}%
            </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
{% endhighlight %}

The backend is a simple MVC controller, all it does is uploading the file and saving the coffee into the database:

{% highlight csharp %}
public async Task<IActionResult> SaveCoffee(Coffee coffee)
{
    // Uploading files
    var fileName = await UploadFiles();

    // Saving data
    coffee.Image = fileName;
    _coffeeService.Add(coffee);
    _coffeeService.SaveChanges();

    return Json("Coffee has been saved!");
}

private async Task<string> UploadFiles()
{
    var uploadsRootFolder = Path.Combine(_environment.WebRootPath, "uploads");
    if (!Directory.Exists(uploadsRootFolder))
    {
        Directory.CreateDirectory(uploadsRootFolder);
    }

    var files = Request.Form.Files;
    foreach (var file in files)

    {
        if (file == null || file.Length == 0)
        {
            continue;
        }

        var filePath = Path.Combine(uploadsRootFolder, file.FileName);
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream).ConfigureAwait(false);
            return file.FileName;
        }
    }

    return string.Empty;
}
{% endhighlight %}

<img src="/public/img/upload-file-vue.gif" alt="Upload file using Vue.js" width="700">
