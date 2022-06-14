<template>

    <header-layout></header-layout>
    <div id="layoutSidenav">

      <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <router-link to="/post" class="nav-link collapsed">Post</router-link>
                            <router-link to="/album" class="nav-link collapsed">Album</router-link>
                        </div>
                    </div>
                </nav>
            </div>
           
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <div class="card mb-4">
                            
                            <div class="card-body">
                                <slot />
                            </div>
                        </div>
                    </div>
                </main>
                <footer-layout></footer-layout>
            </div>
        </div>
    
</template>

<script>

export default {
  name: "BaseLayout"
}
</script>
