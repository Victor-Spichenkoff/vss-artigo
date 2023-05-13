<template>
    <footer class="footer">
        <span>Copyright <strong>Victor Spichenkoff © 2023</strong></span>
    </footer>
</template>

<script>
export default {
    name:'footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>